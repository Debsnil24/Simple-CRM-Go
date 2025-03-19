package routes

import (
	"github.com/Debsnil24/Simple-CRM-Go.git/handler"
	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	r := gin.Default()
	r.GET("/api/crm/getall", handler.GetLeads)
	r.GET("/api/crm/get", handler.GetLead)
	r.POST("/api/crm/new", handler.CreateLead)
	r.DELETE("/api/crm/delete", handler.DeleteLead)
	r.PUT("/api/crm/modify", handler.ModifyLead)
	return r
}