# jogorapido
Aplicativo de Delivery
Query para colocar uma coleta para mim:
UPDATE sd_coleta SET
data_agendamento='2020-05-05',
data_cadastro='2020-05-05 21:01:27-03',
data_notificacao='2020-05-05 21:01:27-03',
status_coleta_id=1,
data_checkin_cliente=NULL,
data_checkout_cliente=NULL,
data_checkin_unidade=NULL,
data_checkout_unidade=NULL
WHERE
coleta_id in(261,262,263,264)