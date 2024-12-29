using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MOBİLECARWASHAPISON.Entities;

public partial class CwWorkerBalance
{
    public Guid Id { get; set; }

    public Guid? WorkerId { get; set; }

    public decimal? Balance { get; set; }

    public bool? IsActive { get; set; }
    [JsonIgnore]
    public virtual CwWorker? Worker { get; set; }
}
