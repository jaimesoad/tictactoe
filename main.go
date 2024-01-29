package main

import (
	"html/template"
	"log"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.Static("/script", "script")
	e.Static("/css", "css")
	e.Static("/assets", "assets")

	e.GET("/", func(c echo.Context) error {
		file := template.Must(template.ParseFiles("index.html"))

		return file.ExecuteTemplate(c.Response(), "index.html", nil)
	})

	log.Fatal(e.Start(":3000"))
}
