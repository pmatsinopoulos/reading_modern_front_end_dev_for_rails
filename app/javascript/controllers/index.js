// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import CssController from "./css_controller.ts"
application.register("css", CssController)

import CssFlipController from "./css_flip_controller.ts"
application.register("css-flip", CssFlipController)

import HelloController from "./hello_controller.ts"
application.register("hello", HelloController)
