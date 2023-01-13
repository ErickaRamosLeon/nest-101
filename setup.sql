CREATE TABLE transactions (
	id CHAR(36) NOT NULL PRIMARY KEY,
    flow_id CHAR(36) NOT NULL,
	custom_id VARCHAR(8) NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT null,
    data TEXT NOT NULL DEFAULT '[]',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id CHAR(36) NOT NULL PRIMARY KEY,
    serial SERIAL NOT NULL,
    transaction_id CHAR(36) NOT NULL,
    type VARCHAR(127) NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    data TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);