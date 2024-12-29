using MOBILECARWASHAPISON.Entities;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwAppointment
{
    public Guid Id { get; set; }

    public Guid? WorkerId { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? AppointmentDate { get; set; }

    public string? Status { get; set; }

    public bool? IsActive { get; set; }
    [JsonIgnore]
    public virtual CwUser? User { get; set; }
    [JsonIgnore]
    public virtual CwWorker? Worker { get; set; }
}
