interface Config{
	baseUrl: string;
	appType: "demo";
	company: "sloovi"
}


export default {
	baseUrl: process.env.NODE_ENV=="development" ? "": "https://enhancer-api-cors.herokuapp.com/https://stage.api.sloovi.com/", 
	demoToken: ``,
	demo_company_id: ``  
}