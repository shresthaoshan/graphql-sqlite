export default {
	SALT: process.env.SALT || "5alT_!_Provid3D",
	TOKEN_SECRET: process.env.TOKEN_SECRET || "token_N0T_!Prov!D3d",
	EXP_OFFSET: (parseInt(process.env.EXPIRE_AFTER_IN_MINUTES) || 10) * 60,
};
