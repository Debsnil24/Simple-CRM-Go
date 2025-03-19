package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Lead struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name    string             `json:"name"`
	Company string             `json:"company"`
	Number  string             `json:"number"`
	Email   string             `json:"email"`
}
