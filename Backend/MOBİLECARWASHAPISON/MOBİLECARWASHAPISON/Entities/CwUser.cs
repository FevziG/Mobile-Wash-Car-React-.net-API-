using MOBİLECARWASHAPISON.Entities;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBILECARWASHAPISON.Entities;

public partial class CwUser
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public string? Email { get; set; }

    public bool? IsActive { get; set; }

    public string? Location { get; set; } // Kullanıcıya ait lokasyon bilgisi

    [JsonIgnore]
    public virtual ICollection<CwAppointment> CwAppointments { get; set; } = new List<CwAppointment>();

    [JsonIgnore]
    public virtual ICollection<CwFeedback> CwFeedbacks { get; set; } = new List<CwFeedback>();

    [JsonIgnore]
    public virtual ICollection<CwPayment> CwPayments { get; set; } = new List<CwPayment>();
}
