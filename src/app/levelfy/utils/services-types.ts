/*
	* serviceName: 		is the name that is displayed in the listing of services for each services
	* route: 			is used for the routing module: '/services/:route'
	* imageUrl:			is the url address for the image that is displayed in the bg of the services listing page
	* description:		is the description used in '/services'
	* buttonMessage:	is the button message in '/services'
	* key:			 	KEY property must be the same as the key that is used to store in the database
	* offers:			the list that is displayed in the form for registering in some services
	
 */
const service1 = {
    serviceName: 'Asesoría Personalizada',
    route: 'ases-per',
    imageUrl:
        'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    description:
        'Clases completamente personalizadas que podrás ' +
        'reservar con amigos, para que puedas absolver tus dudas en los cursos.',
    buttonMessage: '¡Lo quiero!',
    key: 'ASES_PER',
    offers: [
        'Ayuda completamente personalizada',
        'Explicación teórica y práctica',
        'Puedes inscribirte con amigos (Número de estudiantes)',
    ],
};
const service2 = {
    serviceName: 'Paquete de Asesorías',
    route: 'ases-paq',
    imageUrl:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    description:
        'Múltiples asesorías para la preparación exclusiva de evaluaciones en ' +
        'los cursos más complejos.',
    buttonMessage: '¡Lo quiero!',
    key: 'ASES_PAQ',
    offers: [
        'Asesorías personalizadas',
        'Explicación teórica y práctica',
        'Solución de prácticas y/o exámenes',
    ],
};
const service3 = {
    serviceName: 'Maratón',
    route: 'mar',
    imageUrl:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    description:
        'Clases grabadas por nuestros asesores, con la cual podrás aprender a tu ' +
        'manera y con el tiempo que requieras.',
    buttonMessage: '¡Lo quiero!',
    key: 'MAR',
    offers: [
        'Asesoría personalizada',
        'Explicación teórica y práctica',
        'Solución de prácticas y/o exámenes',
    ],
};
const service4 = {
    serviceName: 'Aprende a tu ritmo',
    route: 'self-p',
    imageUrl:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    description:
        'Clases grabadas por nuestros asesores, con la cual podrás aprender a tu ' +
        'manera y con el tiempo que requieras.',
    buttonMessage: '¡Lo quiero!',
    key: 'SELF_P',
    offers: [
        'Asesorías personalizadas',
        'Explicación teórica y práctica',
        'Solución de prácticas y/o exámenes',
    ],
};

// available services
export const servicesTypes = [service1, service2, service3];

// Update always this dict if something changes above
export const mapServiceRoute2ServiceType = {
    'ases-per': service1,
    'ases-paq': service2,
    mar: service3,
    'self-p': service4,
};
