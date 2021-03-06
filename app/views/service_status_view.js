IWitness.ServiceStatusView = Ember.View.extend({
  templateName: "service_status_template",
  classNames: ["service"],

  serviceTypeBinding: 'content',

  monitor: function() {
    var serviceType = this.get("serviceType");
    if (serviceType) return IWitness.searchController.get("monitors").get(serviceType);
  }.property("IWitness.searchController.monitors.twitter", "IWitness.searchController.monitors.flickr", "serviceType"),

  badgeSrc: function() {
    return "images/" + this.get("serviceType") + "_badge.png";
  }.property("serviceType"),

  status: function() {
    var status = this.getPath("monitor.status");
    if      (status == "pending")   { return "no results" }
    else if (status == "searching") { return "scanning" }
    else if (status == "completed") { return "finished" }
    else                            { return status }
  }.property("serviceType", "monitor.status"),

  serviceStatus: function() {
    return 'service-status ' + this.get('status').replace(' ', '');
  }.property('status')
});
