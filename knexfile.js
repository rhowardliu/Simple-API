

const dev = {
	client : 'mysql',
	connection:{
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'MyAPI',
	}
};

const test = {
	client : 'mysql',
	connection:{
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'testMyAPI',
	}
};

module.exports ={
	dev,
	test
};

