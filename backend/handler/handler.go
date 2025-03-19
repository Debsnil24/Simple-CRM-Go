package handler

import (
	"github.com/Debsnil24/Simple-CRM-Go.git/controller"
	"github.com/Debsnil24/Simple-CRM-Go.git/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetLead(c *gin.Context) {
	name := c.Query("name")
	payload, err := controller.GetLead(name)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(404, gin.H{"error": "Lead not found"})
			return
		}
		c.JSON(500, gin.H{"error": "Failed to get Lead"})
	}
	c.JSON(200, payload)
}

func GetLeads(c *gin.Context) {
	payload, err := controller.GetLeads()
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to get Lead"})
		return
	}

	c.JSON(200, payload)
}

func CreateLead(c *gin.Context) {
	var lead models.Lead
	err := c.ShouldBindJSON(&lead)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
	payload, err := controller.CreateLead(lead)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create Lead"})
		return
	}
	c.JSON(200, payload)
}

func DeleteLead(c *gin.Context) {
	id := c.Query("id")
	payload, err := controller.DeleteLead(id)
	if err != nil {
		c.JSON(404, gin.H{"error": "Lead not found"})
		return
	}
	if payload == 0 {
		c.JSON(500, gin.H{"error": "Failed to delete Lead"})
		return
	}
	c.JSON(200, gin.H{"message":"Successfully Deleted "})
}

func ModifyLead(c *gin.Context) {
	id := c.Query("id")
	var lead models.Lead
	err := c.ShouldBindJSON(&lead)
	if err != nil {
		c.JSON(400, gin.H{"error":err.Error()})
		return
	}
	payload, err := controller.ModifyLead(id, lead)
	if err != nil {
		c.JSON(500, gin.H{"error": "Unable to Modify Lead"})
		return
	}
	if payload == nil {
		c.JSON(404, gin.H{"error":"Unable to find Lead"})
		return
	}
	c.JSON(200, payload)
}
