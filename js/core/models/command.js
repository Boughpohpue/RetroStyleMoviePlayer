class Command {
	Id = null;
	Name = null;
	SourceId = null;
	TargetId = null;
	Data = null;

	constructor(name, sourceId, targetId, data = null) {
		this.Id = Guid.newGuid();
		this.Name = name;
		this.SourceId = sourceId;
		this.TargetId = targetId;
		this.Data = data;
	}
}
