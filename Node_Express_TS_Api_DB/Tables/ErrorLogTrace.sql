CREATE TABLE [dbo].[ErrorLogTrace]
(
	[ErrorLogTraceId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[ErrorLogId] INT,
	[TraceMessage] VARCHAR(1000),
	[TraceDate] DATETIME,
)
