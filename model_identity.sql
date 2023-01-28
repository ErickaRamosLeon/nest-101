CREATE SCHEMA IF NOT EXISTS identity_platform;

CREATE TABLE IF NOT EXISTS identity_platform.transactions (
  transaction_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  flow_id UUID NOT NULL,
  custom_id VARCHAR(50),
  created_at TIMESTAMP NOT NULL,
  data json NOT NULL,
  PRIMARY KEY(transaction_id, tenant_id)
);

INSERT INTO identity_platform.transactions
VALUES ('7b84b335-4987-4a20-9aa7-4b60eb90db80', '0b9256a3-c9c3-4f79-bd17-50fc8e10625d', 'd60d072f-07c5-4868-a502-3aafb3f123d3', '1234-ABC', '1970-01-01T00:00:00.000Z', '{"schema": "", "tenantId":"0b9256a3-c9c3-4f79-bd17-50fc8e10625d","transactionId":"7b84b335-4987-4a20-9aa7-4b60eb90db80","assets":[],"step":{"time":null,"value":null}}');