USE [AppTemplateDb]
GO
/****** Object:  StoredProcedure [dbo].[Permission_ReadList]    Script Date: 8/10/2022 8:27:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Marlon Fernandez
-- Create date: 2022-08-09
-- Description:	Get a list of Permissions
-- Updates:
-- Developer Name - Date - Description of the update
-- =============================================
ALTER PROCEDURE [dbo].[sp_Permission_ReadList]
	@offsetRows INT = 0,
    @fetchRows INT = 10,
	@filterJson VARCHAR(MAX),
	@searchJson VARCHAR(MAX),
	@errorCode INT = 0 OUTPUT,
	@errorLogId INT = 0 OUTPUT
AS
BEGIN TRY
	-- Test Data
	--DECLARE @offsetRows INT = 0
	--	   ,@fetchRows INT = 10
	--	   ,@filterJson VARCHAR(MAX) = '{
	--			"name": "Permission1"
	--	   }'
	--	   ,@searchJson VARCHAR(MAX) = '{
	--			"name": "%1%"
	--	   }'
	--	   ,@errorCode INT = 0
	--	   ,@errorLogId INT = 0


	SET NOCOUNT ON
	SET @errorCode = 0
	SET @errorLogId = 0

	-- Local variables
	DECLARE @ProcedureName VARCHAR(100) = 'Permisson_ReadList'
	DECLARE @LogMessage TABLE(LogMessage VARCHAR(MAX), LogDate DATETIME)
	DECLARE @ErrorMsg VARCHAR(500)
	DECLARE @LocalTranStarted bit = 0

    INSERT INTO @LogMessage VALUES (@ProcedureName+' START', GETDATE())

	INSERT INTO @LogMessage VALUES ('ParameterList:' +
									'@offset: ' + ISNULL(CAST(@offsetRows AS VARCHAR), 'NULL') + ' || ' +
									'@limit: ' + ISNULL(CAST(@fetchRows AS VARCHAR), 'NULL') + ' || ' +
									'@filterJson: ' + ISNULL(CAST(@filterJson AS VARCHAR), 'NULL') + ' || ' +
									'@searchJson: ' + ISNULL(CAST(@searchJson AS VARCHAR), 'NULL') + ' || ' +
									'ProfileId: ' + ISNULL(CAST(0 AS VARCHAR), 'NULL')
									, GETDATE())


	----------------------------
	/* PRE-VALIDATION SECTION */
	----------------------------

	INSERT INTO @LogMessage VALUES ('[PRE-VAL] START', GETDATE());
	SET @errorCode = 2

	IF @offsetRows < 0
		OR @fetchRows < 0
	BEGIN
		;THROW 51000, 'The params offsetRows and fetchRows cannot be negative.', 1;
	END

	IF ISNULL(@filterJson,'') != ''
		AND ISJSON(@filterJson) = 0
	BEGIN
		;THROW 51000, 'The filterJson param is not a valid JSON.', 1;
	END

	IF ISNULL(@searchJson,'') != ''
		AND ISJSON(@searchJson) = 0
	BEGIN
		;THROW 51000, 'The searchJson param is not a valid JSON.' , 1;
    END

	--------------------------------
	/* END PRE-VALIDATION SECTION */
	--------------------------------

	SET @errorCode = 0

	-- Fetch all rows
	IF @fetchRows = 0
	BEGIN
        SELECT @fetchRows = COUNT(1) FROM Permission p
    END


	-- Get the values to filter on
	DECLARE @name_filter VARCHAR(500)
		   ,@description_filter VARCHAR(1000)
   SELECT
	   @name_filter = JSON_VALUE(@filterJson, '$.name')
	  ,@description_filter = JSON_VALUE(@filterJson, '$.description')


	-- Get the values to search on
	DECLARE @name_search VARCHAR(500)
		   ,@description_search VARCHAR(1000)
   SELECT
	   @name_search = JSON_VALUE(@searchJson, '$.name')
	  ,@description_search = JSON_VALUE(@searchJson, '$.description')


	-- Get the final result
	SELECT
		p.Name
	   ,p.Description
	FROM Permission p

	-- filter
	WHERE (@name_filter IS NULL OR p.Name = @name_filter)
	AND (@description_filter IS NULL OR p.Description = @description_filter)

	-- search
	AND (@name_search IS NULL OR p.Name LIKE @name_search)
	AND (@description_search IS NULL OR p.Description LIKE @description_search)

	ORDER BY p.Name
	OFFSET @offsetRows ROWS
	FETCH NEXT @fetchRows ROWS ONLY


	INSERT INTO @LogMessage VALUES (@ProcedureName+' END', GETDATE())

END TRY

BEGIN CATCH

	SET @ErrorMsg = 'STORED PROC ERROR'
	+ ' - PROC: ' + ISNULL(@ProcedureName, 'N/A')
	+ ' - LINE: ' + CAST(ISNULL(ERROR_LINE(), 0) AS VARCHAR(50))
	+ ' - MSG: ' + ERROR_MESSAGE()


	-- Write Error logs kept through SP
	INSERT INTO ErrorLog (ErrorMessage, ErrorDetail, StackTrace, ErrorDate)
		VALUES (@errorMsg, '', '', GETDATE())

	SELECT @errorLogId = SCOPE_IDENTITY()
	INSERT INTO ErrorLogTrace (ErrorLogId, TraceMessage, TraceDate)
		SELECT
			@errorLogId
		   ,LogMessage
		   ,LogDate
		FROM @LogMessage

	-- Set @errorCode to 1 to return failure to UI
	IF @errorCode = 0
		SET @errorCode = 1;

END CATCH