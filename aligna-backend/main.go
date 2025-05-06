package main

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

type Question struct {
	ID	   int    `json:"id"`
	Text   string `json:"question_text"`
	Trait  string `json:"trait"`
}

func main() {
	db, _ := sql.Open("postgres", "postgresql://postgres:soKCcyVCqgxsXesJgwHvFhZGiZEptvwg@crossover.proxy.rlwy.net:36171/railway?sslmode=require")
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/questions", func(c *fiber.Ctx) error {
		rows, _ := db.Query("SELECT id, question_text, trait FROM questions")
		var questions []Question

		for rows.Next() {
			var q Question
			rows.Scan(&q.ID, &q.Text, &q.Trait)
			questions = append(questions, q)
		}

		log.Println(questions)
		return c.JSON(questions)

	})

	app.Listen(":3001")
}