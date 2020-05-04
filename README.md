# jogorapido
Aplicativo de Delivery
Query para colocar uma coleta para mim:
UPDATE sd_coleta
SET
data_agendamento='2020-05-03',
data_cadastro='2020-05-03 21:01:27-03',
status_coleta_id=2
WHERE
coleta_id in(261,262,263,264)