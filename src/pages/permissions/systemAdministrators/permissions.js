const permissionsMap = {
    statistics: {
      display: "Permissions.BusShuttle.InteractiveStatistics.Display",
    },
    trips: {
      display: "Permissions.BusShuttle.Orders.GetAll",
      add: "Permissions.BusShuttle.Orders.Add",
    },
    buses: {
      display: "Permissions.BusShuttle.Buses.Display",
      add: "Permissions.BusShuttle.Buses.Add",
      edit: "Permissions.BusShuttle.Buses.Edit",
    },
    drivers: {
      display: "Permissions.BusShuttle.Drivers.Display",
      add: "Permissions.BusShuttle.Drivers.Add",
      edit: "Permissions.BusShuttle.Drivers.Edit",
    },
    events: {
      display: "Permissions.SystemAdmin.Event.GetAll",
      add: "Permissions.SystemAdmin.Event.Add",
      edit: "Permissions.SystemAdmin.Event.Edit",
      delete: "Permissions.SystemAdmin.Event.Delete",
    },
    routes: {
      display: "Permissions.BusShuttle.Routes.Display",
      add: "Permissions.BusShuttle.Routes.Add",
      edit: "Permissions.BusShuttle.Routes.Edit",
      delete: "Permissions.BusShuttle.Routes.Delete",
    },
    // reasons: {
    //   display: "Permissions.BusShuttle.Reasons.Display",
    //   add: "Permissions.BusShuttle.Reasons.Add",
    //   edit: "Permissions.BusShuttle.Reasons.Edit",
    //   delete: "Permissions.BusShuttle.Reasons.Delete",
    // },
    reasonForCancelation:{
      display: "Permissions.BusShuttle.CancelReason.GetAll",
      add: "Permissions.BusShuttle.CancelReason.Add",
      edit: "Permissions.BusShuttle.CancelReason.Edit",
      delete: "Permissions.BusShuttle.CancelReason.Delete",
    },
  };
  const vipPermissionsMap = {
    statistics: {
      display: "Permissions.VIPCar.InteractiveStatistics.Display",
    },
    orders: {
      display: "Permissions.VIPCar.Orders.Display",
      add: "Permissions.VIPCar.Orders.Add",
      edit: "Permissions.VIPCar.Orders.Edit",
      delete: "Permissions.VIPCar.Orders.Delete",
    },
    cars: {
      display: "Permissions.VIPCar.Cars.Display",
      add: "Permissions.VIPCar.Cars.Add",
      edit: "Permissions.VIPCar.Cars.Edit",
      delete: "Permissions.VIPCar.Cars.Delete",
    },
    drivers: {
      display: "Permissions.VIPCar.Drivers.Display",
      add: "Permissions.VIPCar.Drivers.Add",
      edit: "Permissions.VIPCar.Drivers.Edit",
      delete: "Permissions.VIPCar.Drivers.Delete",
    },
    event: {
      display: "Permissions.SystemAdmin.Event.GetAll",
      add: "Permissions.SystemAdmin.Event.Add",
      edit: "Permissions.SystemAdmin.Event.Edit",
      delete: "Permissions.SystemAdmin.Event.Delete",
    },
    reasonForCancelation:{
      display: "Permissions.VIPCar.CancelReason.GetAll",
      add: "Permissions.VIPCar.CancelReason.Add",
      edit: "Permissions.VIPCar.CancelReason.Edit",
      delete: "Permissions.VIPCar.CancelReason.Delete",
    },
  };
  const hospitalityPermissionsMap = {
    statistics: {
      display: "Permissions.Hospitality.InteractiveStatistics.Display",
    },
    orders: {
      display: "Permissions.Hospitality.Orders.GetAll",
      add: "Permissions.Hospitality.Orders.Add",
      edit: "Permissions.Hospitality.Orders.Edit",
    },
    categories: {
      display: "Permissions.Hospitality.Categories.GetAll",
      add: "Permissions.Hospitality.Categories.Add",
      edit: "Permissions.Hospitality.Categories.Edit",
    },
    items: {
      display: "Permissions.Hospitality.Items.GetAll",
      add: "Permissions.Hospitality.Items.Add",
      edit: "Permissions.Hospitality.Items.Edit",
    },
    teaBoy: {
      display: "Permissions.Hospitality.ServiceProviders.GetAll",
      add: "Permissions.Hospitality.ServiceProviders.Add",
      edit: "Permissions.Hospitality.ServiceProviders.Edit",
    },
    reasonForCancelation:{
      display: "Permissions.Hospitality.CancelReason.GetAll",
      add: "Permissions.Hospitality.CancelReason.Add",
      edit: "Permissions.Hospitality.CancelReason.Edit",
      delete: "Permissions.Hospitality.CancelReason.Delete",
    },
  };
  const accountsPermissionsMap = {
    systemUsers: {
      display: "Permissions.SystemAdmin.Accounts.Users.GetAll",
      add: "Permissions.SystemAdmin.Accounts.Users.Add",
      edit: "Permissions.SystemAdmin.Accounts.Users.Edit",
      delete: "Permissions.SystemAdmin.Accounts.Users.Delete",
    },
    serviceProvider: {
      display: "Permissions.SystemAdmin.Accounts.ServiceProviders.GetAll",
      add: "Permissions.SystemAdmin.Accounts.ServiceProviders.Add",
      edit: "Permissions.SystemAdmin.Accounts.ServiceProviders.Edit",
      delete: "Permissions.SystemAdmin.Accounts.ServiceProviders.Delete",
    },
  };
  const eventsPermissionsMap = {
    events: {
      display: "Permissions.SystemAdmin.Permissions.Events.GetAll",
      add: "Permissions.SystemAdmin.Permissions.Events.Addl",
      edit: "Permissions.SystemAdmin.Permissions.Events.Edit",
      delete: "Permissions.SystemAdmin.Permissions.Events.Delete",
    },
  };
  const prPermissionsMap = {
    adminstrator: {
      display: "Permissions.SystemAdmin.Permissions.Administrators.GetAll",
      add: "Permissions.SystemAdmin.Permissions.Administrators.Add",
      edit: "Permissions.SystemAdmin.Permissions.Administrators.Edit",
      delete: "Permissions.SystemAdmin.Permissions.Administrators.Delete",
    },
    eventPowers: {
      display: "Permissions.SystemAdmin.Permissions.Events.GetAll",
      add: "Permissions.SystemAdmin.Permissions.Events.Add",
      edit: "Permissions.SystemAdmin.Permissions.Events.Edit",
      delete: "Permissions.SystemAdmin.Permissions.Events.Delete",
    },
  };
  const organizationPermissionsMap = {
    headquarters: {
      display: "Permissions.SystemAdmin.CorporationHeadQuarters.Office.GetAll",
      add: "Permissions.SystemAdmin.CorporationHeadQuarters.Office.Add",
      edit: "Permissions.SystemAdmin.CorporationHeadQuarters.Office.Edit",
      delete: "Permissions.SystemAdmin.CorporationHeadQuarters.Office.Delete",
    },
    buildings: {
      display: "Permissions.SystemAdmin.Buildings.GetAll",
      add: "Permissions.SystemAdmin.Buildings.Add",
      edit: "Permissions.SystemAdmin.Buildings.Edit",
      delete: "Permissions.SystemAdmin.Buildings.Delete",
    },
    theAuthorities: {
      display: "Permissions.SystemAdmin.Sides.GetAll",
      add: "Permissions.SystemAdmin.Sides.Add",
      edit: "Permissions.SystemAdmin.Sides.Edit",
      delete: "Permissions.SystemAdmin.Sides.Delete",
    },
    floors: {
      display: "Permissions.SystemAdmin.Floors.GetAll",
      add: "Permissions.SystemAdmin.Floors.Add",
      edit: "Permissions.SystemAdmin.Floors.Edit",
      delete: "Permissions.SystemAdmin.Floors.Delete",
    },
    companies: {
      display: "Permissions.SystemAdmin.Companies.GetAll",
      add: "Permissions.SystemAdmin.Companies.Add",
      edit: "Permissions.SystemAdmin.Companies.Edit",
      delete: "Permissions.SystemAdmin.Companies.Delete",
    },
    rooms: {
      display: "Permissions.SystemAdmin.Rooms.GetAll",
      add: "Permissions.SystemAdmin.Rooms.Add",
      edit: "Permissions.SystemAdmin.Rooms.Edit",
      delete: "Permissions.SystemAdmin.Rooms.Delete",
    },
  };

  export {permissionsMap,vipPermissionsMap,hospitalityPermissionsMap,accountsPermissionsMap,eventsPermissionsMap,prPermissionsMap,organizationPermissionsMap}