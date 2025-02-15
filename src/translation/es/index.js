import aiAgents from "./aiAgents.json";
import common from "./common.json";
import data from "./data.json";
import home from "./home.json";
import impact from "./impact.json";
import rpa from "./rpa.json";
import services from "./services.json";
import success from "./success.json";
import team from "./team.json";

const translation = {
  ...common,
  home,
  team,
  services,
  rpa,
  aiAgents,
  data,
  impact,
  success,
};

export default translation;
