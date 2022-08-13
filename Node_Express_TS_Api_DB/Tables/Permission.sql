IF OBJECT_ID('dbo.Permission', 'U') IS NOT NULL
	DROP TABLE dbo.Permission
GO



CREATE TABLE dbo.Permission
(
	--PermissionId INT IDENTITY(1,1),
	P_Name VARCHAR(200) NOT NULL,
	P_DESCRIPTION VARCHAR(1000) NOT NULL 

	--CONSTRAINT PK_Permission_PermissionId PRIMARY KEY (PermissionId)
)
GO

