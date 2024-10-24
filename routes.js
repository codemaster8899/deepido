import { createWebHistory, createRouter } from "vue-router";

import TicketIndex from "./views/tickets/index.vue";
import UserIndex from "./views/users/index.vue";
import UserShow from "./views/users/show.vue";
import ClientIndex from "./views/clients/index.vue";
import ClientShow from "./views/clients/edit.vue";
import ClientNew from "./views/clients/new.vue";
import ContactIndex from "./views/contacts/index.vue";
import ContactNew from "./views/contacts/new.vue";
import ContactEdit from "./views/contacts/show.vue";

const router = createRouter({
  history: createWebHistory(`/${I18n.prefix}admin`),
  routes: [
    { path: "/", component: TicketIndex, name: "home" },
    { path: "/users", component: UserIndex, name: "users" },
    { path: "/users/:id", component: UserShow, name: "user" },
    { path: "/clients/", component: ClientIndex, name: "clients" },
    { path: "/clients/new", component: ClientNew, name: "new-client" },
    { path: "/clients/:id", component: ClientShow, name: "show-client" },
    { path: "/contacts", component: ContactIndex, name: "contacts" },
    { path: "/contacts/new", component: ContactNew, name: "new_contact" },
    { path: "/contacts/:id", component: ContactEdit, name: "contact" },
  ],
});

// Handles 404 Not found
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    window.location.href = "/404";
  } else {
    next();
  }
});

export default router;
