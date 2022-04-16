import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "downloads", "dist/app" );
shell.cp( "-R", "assets", "dist/app" );
shell.cp( "-R", "views", "dist/app" );
shell.cp( "-R", "orderapp", "dist/orderapp" );
