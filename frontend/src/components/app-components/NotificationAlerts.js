import { Notifications } from "@mantine/notifications";

export function ErrorAlert(message) {
  Notifications.show({
    title: "Error!",
    message: message,
    color: "red",
    style: {},
  });
}

export function SuccessAlert(message) {
  Notifications.show({
    title: "Success!",
    message: message,
    color: "green",
    style: {},
  });
}
