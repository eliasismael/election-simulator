# votacion
Sistema de votacion de candidatos

Se genera la cantidad de candidatos y votantes ingresada por el usuario.
Cada candidato tiene una ideología diferente con una propuesta armada a partir de distintas ideas posibles.

Se utiliza una función que genera sustantivos propios desde 0 para asignar nombres y apellidos a los candidatos y votantes.
A estos últimos tambíen se les genera una ciudad de residencia.
Se incluyen reglas gramaticas del español para cuando se presemta una letra "q" o una letra "g".

Cada votante tiene un número de DNI que es único e irrepetible. Pudiendo ir desde 1 hasta 100.000.000.

Cuando se da click en "Votar" inicia un proceso asíncrono que simula el conteo de votos.
En caso de haber empate se realiza un sorteo entre los más votados para elegir a un ganador.

Al final de la votación se puede conocer el nombre, apellido, número de DNI y ciudad de cada votante.
También se puede ver la propuesta completa de cada candidato en los ámbitos económicos, políticos y sociales.

La votación se puede frenar en cualquier momento apretando "Nueva votación".
También se puede esperar a que termine y empezar una nueva.
