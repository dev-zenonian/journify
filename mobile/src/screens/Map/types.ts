export type PlaceData = {
	id: string;
	name: string;
	handle: string;
	location: Location;
	imageUrl: string;
	checkInCount: number;
};

export type Location = {
	latitude: number;
	longitude: number;
};

export type UserInfo = {
	name: string;
	image: string;
	handle: string;
	tick: boolean;
	discovery: number;
};

export type Reply = {
	checkInId: string;
	content: string;
	user: UserInfo;
};

export type CheckInData = {
	id: string;
	placeId: string;
	user: UserInfo;
	upvote: number;
	downvote: number;
	impressions: number;
	caption: string;
	imageUrl: string;
	replyCount: number;
	reply?: Reply[];
};
