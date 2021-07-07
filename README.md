Scrapes error function calls from the codebase and writes to the clipboard in a format suitable for pasting into the WARNINGS table.

run `npm link` in a cmd line in the root of this project. This creates the 'scrape' command.

Navigate to 3dcadsoftsvn/ClosetCADPro/ClosetCADPro in the command line. Run 'scrape' in this folder.

Scrape will search every .cpp file in the folder for SetError(GetWarning(L".....", L".........", vars), organise them in an object with line numbers and other info, and finaly format it for the WARNINGS table and copy to the clipboard. The result can be pasted into WARNINGS.
