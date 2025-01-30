import aiAgents from "./aiAgents.json";
import common from "./common.json";
import data from "./data.json";
import healthcare from "./healthcare.json";
import home from "./home.json";
import rpa from "./rpa.json";
import services from "./services.json";
import team from "./team.json";

const translation = {
  ...common,
  home,
  team,
  services,
  rpa,
  aiAgents,
  data,
  healthcare,
};

export default translation;
