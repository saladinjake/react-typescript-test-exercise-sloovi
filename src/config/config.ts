interface Config{
	baseUrl: string;
	appType: "demo";
	company: "sloovi"
}


export default {
	baseUrl: process.env.NODE_ENV=="development" ? "": "https://enhancer-api-cors.herokuapp.com/", 
	demoToken: ``,
	demo_company_id: ``  
}