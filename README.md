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

=> Verificar o rendimento dos ultimos 7 dias do login, parece que ele não esta pegando apenas os ultimos 7 dias
=> Criar metodo separado de rendimento dos ultimos 7 dias (Trazer apenas total de rendimentos e total de corridas)
=> Noticicação de escala não esta notificando
=> O sistema está colocando todas as coletas como concluidas se eu concluir apenas a coleta pai (Somente no admin).
=> Se alterar o status para checkout unidade a coleta simplesmente é finalizada sozinha.
==> Para simular é simples, basta fazer uma coleta, e colocar ela com status checkuout unidade, dai vc executa o método login no app e pronto, a coleta é finalizada sem nenhuma interação humana.
=> Se mudar a unidade de um pedido ele volta o pedido automaticamente para o status pendente, e não notifica o usuário que o pedido mudou para o status expedindo. Neste caso creio que não deveria mudar o status sozinho e sim manter o mesmo status, e em todos os casos de auteracão de uma coleta que tenha entregador, tem que notificar o cara do que esta acontecendo. Isto deve acontecer tanto na coleta quando no pedido