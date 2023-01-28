CREATE TABLE public.transactions (
	id CHAR(36) NOT NULL PRIMARY KEY,
    flow_id CHAR(36) NOT NULL,
    custom_id  CHAR(36) NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL,        
    current_step TEXT NOT NULL DEFAULT '{}',
    steps TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT '{}',        
    timeline TEXT NOT NULL DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE public.events (
    id CHAR(36) NOT NULL PRIMARY KEY,
    serial SERIAL NOT NULL,
    transaction_id CHAR(36) NOT NULL,
    type VARCHAR(127) NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    data TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE ,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    FOREIGN KEY(transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);