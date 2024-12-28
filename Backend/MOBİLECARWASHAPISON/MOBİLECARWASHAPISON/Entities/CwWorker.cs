using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwWorker
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public string? PhoneNumber { get; set; }

    public string? TaxNumber { get; set; }

    public string? Email { get; set; }

    public bool? IsActive { get; set; }

    public string? Location { get; set; }

    [JsonIgnore]
    public virtual ICollection<CwAppointment> CwAppointments { get; set; } = new List<CwAppointment>();
    [JsonIgnore]
    public virtual ICollection<CwFeedback> CwFeedbacks { get; set; } = new List<CwFeedback>();
    [JsonIgnore]

    public virtual ICollection<CwPayment> CwPayments { get; set; } = new List<CwPayment>();
    [JsonIgnore]
    public virtual ICollection<CwWorkerBalance> CwWorkerBalances { get; set; } = new List<CwWorkerBalance>();
    [JsonIgnore]
    public virtual ICollection<CwWorkerService> CwWorkerServices { get; set; } = new List<CwWorkerService>();
}
