Sua escala foi atualizada com sucesso. Logo nosso moderador ira analisar sua solicitação.
Sua escala tem validade de uma semana. Ou seja, na próxima segunda-feira se quiser ser trabalhar terá que escolher seus dias e horários novamente.
# coleta confirmada
UPDATE sd_coleta SET
data_agendamento=now()::timestamp::date,
data_cadastro=now(),
data_notificacao=now(),
status_coleta_id=2,
data_checkin_cliente=NULL,
data_checkout_cliente=NULL,
data_checkin_unidade=NULL,
data_checkout_unidade=NULL,
unidade_id=3,
cep='74355-150',
endereco='Via Graça Aranha',
bairro='Condomínio Amin Camargo',
total_pago='0.00'
WHERE
coleta_id in(567, 568);

# coleta checkout unidade
UPDATE sd_coleta SET
data_agendamento=now()::timestamp::date,
data_cadastro=now(),
data_notificacao=now(),
status_coleta_id=4,
data_checkin_cliente=NULL,
data_checkout_cliente=NULL,
data_checkin_unidade=now(),
data_checkout_unidade=now(),
unidade_id=3,
cep='74355-150',
endereco='Via Graça Aranha',
bairro='Condomínio Amin Camargo',
total_pago='0.00'
WHERE
coleta_id in(567, 568);

# coleta checkin cliente
UPDATE sd_coleta SET
data_agendamento=now()::timestamp::date,
data_cadastro=now(),
data_notificacao=now(),
status_coleta_id=5,
data_checkin_cliente=now(),
data_checkout_cliente=NULL,
data_checkin_unidade=now(),
data_checkout_unidade=now(),
unidade_id=3,
cep='74355-150',
endereco='Via Graça Aranha',
bairro='Condomínio Amin Camargo',
total_pago='0.00',
forma_pagamento='cartão'
WHERE
coleta_id in(567, 568);

# coleta delete
DELETE FROM sd_coleta_pagamento WHERE coleta_id in(567, 568);

# coleta select
select * from sd_coleta WHERE coleta_id in(567, 568);

=> Verificar o rendimento dos ultimos 7 dias do login, parece que ele não esta pegando apenas os ultimos 7 dias
=> Criar metodo separado de rendimento dos ultimos 7 dias (Trazer apenas total de rendimentos e total de corridas)
=> Noticicação de escala não esta notificando
=> O sistema está colocando todas as coletas como concluidas se eu concluir apenas a coleta pai (Somente no admin).
=> Se alterar o status para checkout unidade a coleta simplesmente é finalizada sozinha.
==> Para simular é simples, basta fazer uma coleta, e colocar ela com status checkuout unidade, dai vc executa o método login no app e pronto, a coleta é finalizada sem nenhuma interação humana.
=> Se mudar a unidade de um pedido ele volta o pedido automaticamente para o status pendente, e não notifica o usuário que o pedido mudou para o status expedindo. Neste caso creio que não deveria mudar o status sozinho e sim manter o mesmo status, e em todos os casos de auteracão de uma coleta que tenha entregador, tem que notificar o cara do que esta acontecendo. Isto deve acontecer tanto na coleta quando no pedido