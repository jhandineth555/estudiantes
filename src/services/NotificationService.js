import notifee, { AndroidImportance } from '@notifee/react-native';

export async function mostrarNotificacion(titulo, cuerpo) {
  // Crea un canal (solo la primera vez)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Notificaciones',
    importance: AndroidImportance.HIGH,
  });

  // Muestra la notificación
  await notifee.displayNotification({
    title: titulo,
    body: cuerpo,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
