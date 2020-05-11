# jogorapido
Aplicativo de Delivery
Query para colocar uma coleta para mim:
UPDATE sd_coleta SET
data_agendamento='2020-05-07',
data_cadastro='2020-05-07 21:01:27-03',
data_notificacao='2020-05-07 21:01:27-03',
status_coleta_id=2,
data_checkin_cliente=NULL,
data_checkout_cliente=NULL,
data_checkin_unidade=NULL,
data_checkout_unidade=NULL
WHERE
coleta_id in(261,262,263,264)

=> Verificar se o não perturbe esta ativado
=> Verificar se o volume está no 100%
=> Verificar o rendimento da semana
=> Noticicação de escala não esta enviando
=> O sistema está colocando todas as coletas como concluidas se eu concluir apenas a coleta pai.
=> Na lista de coletas finalizadas remover a coleta do app.