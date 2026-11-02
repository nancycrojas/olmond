import { List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { GrCircleAlert } from "react-icons/gr";

import { GradientDivider } from "../ui/GradientDivider.jsx";
import { SectionShell } from "../ui/SectionShell.jsx";

const dolores = [
  "Su equipo (o usted) pierde horas cada semana en tareas que se repiten igual: cargar datos, responder las mismas consultas, armar los mismos reportes.",
  'Sabe que "hay que hacer algo con la IA", pero entre el día a día nunca aparece el momento de empezar.',
  "Incorporó herramientas que quedaron sin uso a las pocas semanas, porque nadie definió cómo integrarlas a la operación.",
  "Ve que el mercado avanza y desea tomar decisiones con información, no con intuición.",
];

export function Problema() {
  return (
    <SectionShell
      label="¿Alguna de estas situaciones se repite en su empresa?"
      title="Si se identifica con estas situaciones, puede comenzar por el diagnóstico"
    >
      <List spacing={5} maxW="3xl">
        {dolores.map((d) => (
          <ListItem
            key={d}
            fontSize="lg"
            display="flex"
            alignItems="flex-start"
          >
            <ListIcon
              as={GrCircleAlert}
              color="brand.accent"
              mt={1.5}
              boxSize={5}
            />
            <Text as="span">{d}</Text>
          </ListItem>
        ))}
      </List>
      <GradientDivider />
      <Text fontSize="lg" fontWeight="600" maxW="3xl">
        El problema no es la falta de herramientas. Es no saber cuál es su
        próximo paso. Eso es exactamente lo que resuelve este diagnóstico.
      </Text>
    </SectionShell>
  );
}
