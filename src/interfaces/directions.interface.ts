export interface DirectionsResponse {
	routes: Route[];
	waypoints: Waypoint[];
	code: string;
	uuid: string;
}

export interface Route {
	weight_name: string;
	weight: number;
	duration: number;
	distance: number;
	legs: Leg[];
	geometry: Geometry;
}

export interface Geometry {
	coordinates: Array<number[]>;
	type: string;
}

export interface Leg {
	via_waypoints: unknown[];
	admins: Admin[];
	weight: number;
	duration: number;
	steps: unknown[];
	distance: number;
	summary: string;
}

export interface Admin {
	iso_3166_1_alpha3: string;
	iso_3166_1: string;
}

export interface Waypoint {
	distance: number;
	name: string;
	location: number[];
}
