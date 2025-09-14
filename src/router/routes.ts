import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    // Ruta padre que usará MainLayout para todos los hijos
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // Usamos el 'name' para una navegación más clara
    children: [
      {
        path: '', // Ruta para la página de inicio (ej: '/')
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'clinic_case/:patient_id/create', // Ruta para crear un caso clinico / historia clinica
        name: 'create_clinic_case',
        component: () => import('pages/ClinicCasePageCreate.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'clinic_case/:patient_id/:clinic_case_id', // Ruta para ver un caso clínico específico
        name: 'update_clinic_case',
        component: () => import('pages/ClinicCasePageUpdate.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'patient/create', // Ruta para crear un paciente (ej: '/patient/create')
        name: 'create_patient',
        component: () => import('pages/PatientPageCreate.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'patient/update/:id', // Ruta para actualizar un paciente
        name: 'update_patient',
        component: () => import('pages/PatientPageUpdate.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'patient/:id', // Ruta para ver un paciente específico (ej: '/patient/123')
        name: 'one_patient',
        component: () => import('pages/PatientPageGetOne.vue'),
        props: true, // Esto sigue siendo necesario para pasar el ID como prop
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'history/:patient_id',
        name: 'patient_history',
        component: () => import('pages/HistoryPatientPage.vue'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'register', // Ruta para registrar un usuario
        name: 'register',
        component: () => import('pages/AuthPageRegister.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: 'login', // Ruta para el inicio de sesión
        name: 'login',
        component: () => import('pages/AuthPageLogin.vue'),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  // La ruta de ErrorNotFound debe permanecer fuera de la ruta padre
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];


export default routes;
