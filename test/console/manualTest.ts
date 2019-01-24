import { info, warn, error } from "../../src/console/console";

error("Below is an error message");
error(`This is an error message
that spans
several
lines!`);

warn("Below is a warning message");
warn("This is a warning message that also spans several lines but by exceeding the maximum amount of characters the console can represent on a single line, forcing it to put the rest of the characters on the next line.\nThis process is called 'word wraping'. It is used pretty much everywhere where you read text because no one wants to scroll horizontally to read text.");

info("Below is an info message");
info(`I can make
consoles look
good too!`);
info("ThisIsAReallyLongWordThatShouldBreakWhenItExceedsTheMaximumNumberOfCharactersThatCanFitOntoOneLineButHasNoSpacesSoItHasNoPointsForItToBreakOn");