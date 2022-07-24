interface Config{
	baseUrl: string;
	appType: "demo";
	company: "sloovi"
}


export default {
	baseUrl: process.env.NODE_ENV=="development" ? "": "https://cors-anywhere.herokuapp.com/https://stage.api.sloovi.com"  
}