import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation();
  return (
    <Box
      maxW="80%"
      mx="auto"
      py={20}
      color="white"
      data-aos="fade-up"
      data-aos-duration="1000"
      w={{ base: "100%", md: "700px", lg: "800px" }}
    >
      <Box textAlign="center" mb={12}>
        <Heading
          as="h3"
          display="inline-block"
          size="xl"
          background="linear-gradient(to right, #113cff, #f42ea8)"
          bgClip="text"
        >
          {t("faq.faq")}
        </Heading>
      </Box>

      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_1")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_1")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_2")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_2")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_3")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_3")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_4")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_4")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_5")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_5")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_6")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_6")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_7")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_7")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_8")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_8")}</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_9")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            {t("faq.answers.answer_9")}
            <br />– {t("faq.answers.answer_9_a")}
            <br />– {t("faq.answers.answer_9_b")}
            <br />– {t("faq.answers.answer_9_c")}
            <br />– {t("faq.answers.answer_9_d")}
            <br />– {t("faq.answers.answer_9_e")}
            <br />– {t("faq.answers.answer_9_f")}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight="bold">
              {t("faq.questions.question_10")}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{t("faq.answers.answer_10")}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
