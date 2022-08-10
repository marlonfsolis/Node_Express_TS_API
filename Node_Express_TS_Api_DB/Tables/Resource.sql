CREATE TABLE [dbo].[Resource]
(
	[ResourceId] INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	[Title] VARCHAR(500),
	[Description] VARCHAR(1000),
	[Resource_Link] VARCHAR(500),
	[ImageUrl] VARCHAR(500),
	[Priority] INT,
	[TimeToFinish] INT,
	[Active] BIT,
	[CreatedAt] DATETIME 
)
