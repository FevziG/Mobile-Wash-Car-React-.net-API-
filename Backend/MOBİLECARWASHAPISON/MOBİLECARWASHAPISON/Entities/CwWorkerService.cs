using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwWorkerService
{
    public Guid Id { get; set; }

    public Guid? WorkerId { get; set; }

    public Guid? ServiceId { get; set; }

    public bool? IsActive { get; set; }
    [JsonIgnore]
    public virtual CwService? Service { get; set; }
    [JsonIgnore]
    public virtual CwWorker? Worker { get; set; }
}
