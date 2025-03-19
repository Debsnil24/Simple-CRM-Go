package controller

import (
	"context"
	"log"
	"os"

	"github.com/Debsnil24/Simple-CRM-Go.git/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

func init() {
	client := InitDB()
	collection = client.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))
}

func GetLead(name string) (*models.Lead, error){
	filter := bson.M{"name": name}
	cur := collection.FindOne(context.Background(), filter)

	var lead models.Lead
	err := cur.Decode(&lead)
	if err != nil {
		return nil, err
	}
	return &lead, err
}

func GetLeads() (*[]models.Lead, error) {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	var leads []models.Lead
	for cur.Next(context.Background()) {
		var lead models.Lead
		err := cur.Decode(&lead)
		if err != nil {
			return nil, err
		}
		leads = append(leads, lead)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}
	
	return &leads, err
}

func CreateLead(lead models.Lead) (*models.Lead, error){
	result, err := collection.InsertOne(context.Background(), lead)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": result.InsertedID}
	cur := collection.FindOne(context.Background(), filter)

	var createdLead models.Lead
	err = cur.Decode(&createdLead)
	if err != nil {
		return nil, err
	}
	return &createdLead, nil
}

func DeleteLead(ID string) (int64, error){
	id, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		log.Fatal("Error: Unable to convert ID", err)
	}
	filter := bson.M{"_id": id}
	result, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return 0, err
	}
	return result.DeletedCount, nil
}

func ModifyLead(ID string, lead models.Lead) (*models.Lead, error){
	id, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		log.Fatal("Error: Unable to convert ID", err)
	}
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{}}

	if lead.Name != "" {
		update["$set"].(bson.M)["name"] = lead.Name
	}
	if lead.Number != "" {
		update["$set"].(bson.M)["number"] = lead.Number
	}
	if lead.Email != "" {
		update["$set"].(bson.M)["email"] = lead.Email
	}
	if lead.Company != "" {
		update["$set"].(bson.M)["company"] = lead.Company
	}

	if len(update["$set"].(bson.M)) == 0 {
		var lead models.Lead
		err = collection.FindOne(context.Background(), filter).Decode(&lead)
		if err != nil {
			return nil, err
		}
		return &lead, nil
	}

	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return nil, err
	}
	if result.ModifiedCount == 0 {
		return nil, nil
	}
	var updatedLead models.Lead 
	err = collection.FindOne(context.Background(),filter).Decode(&updatedLead)
	if err != nil {
		return nil, err
	}
	return &updatedLead, nil
}