import { Notifications } from "@mantine/notifications";

function ErrorAlert(message) {
  Notifications.show({
    title: "Error!",
    message: message,
    color: "red",
    style: {},
  });
}

export default ErrorAlert;
