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

=> Verificar o rendimento da semana
=> Noticicação de escala não esta enviando
=> O sistema está colocando todas as coletas como concluidas se eu concluir apenas a coleta pai.
=> Se eu mudo o status para checkout unidade dai a coleta simplesmente é finalizada sozinha
==> Para simular é simples, basta fazer uma coleta, e colocar ela com status checkuout unidade, dai vc executa o método login no app e pronto, a coleta é finalizada sem nenhuma interação humana.
=> Se mudar a unidade de um pedido ele volta o pedido automaticamente para o status pendente, e não notifica o usuário que o pedido mudou para o status expedindo. Neste caso creio que não deveria mudar o status sozinho.