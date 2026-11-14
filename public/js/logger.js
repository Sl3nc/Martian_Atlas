/**
 * Structured Telemetry & Incident Logger (debug-driven pattern)
 * Records all newly registered scientific points, critical obstacles (1-5 scale),
 * route calculations, and dynamic detours with a correlation_id.
 */

(function () {
  const logs = [];
  const listeners = [];

  function generateCorrelationId() {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return "cid-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8);
  }

  function record(level, eventName, payload = {}, correlationId = null) {
    const entry = {
      id: "LOG_" + (logs.length + 1).toString().padStart(4, "0"),
      timestamp: new Date().toISOString(),
      level: level || "INFO",
      correlation_id: correlationId || generateCorrelationId(),
      event: eventName,
      payload,
    };
    logs.unshift(entry);
    console.debug(`[MartianAtlas][${entry.level}][${entry.correlation_id}] ${entry.event}`, payload);
    listeners.forEach((fn) => fn(entry, logs));
    return entry;
  }

  function onLog(callback) {
    listeners.push(callback);
  }

  function getLogs() {
    return logs;
  }

  function exportLogsAsJson() {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `martian_atlas_logs_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  window.AtlasLogger = {
    generateCorrelationId,
    record,
    onLog,
    getLogs,
    exportLogsAsJson,
  };
})();
