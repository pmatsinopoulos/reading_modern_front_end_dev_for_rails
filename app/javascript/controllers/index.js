// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import CalendarController from "./calendar_controller.ts"
application.register("calendar", CalendarController)

import ConcertController from "./concert_controller.ts"
application.register("concert", ConcertController)

import CssController from "./css_controller.ts"
application.register("css", CssController)

import CssFlipController from "./css_flip_controller.ts"
application.register("css-flip", CssFlipController)

import HelloController from "./hello_controller.ts"
application.register("hello", HelloController)

import SearchController from "./search_controller.ts"
application.register("search", SearchController)

import SoldOutDataController from "./sold_out_data_controller.ts"
application.register("sold-out-data", SoldOutDataController)

import SortController from "./sort_controller.ts"
application.register("sort", SortController)
