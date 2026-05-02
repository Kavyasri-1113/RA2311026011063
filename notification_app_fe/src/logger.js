const LOG_API_URL = "[http://20.207.122.201/evaluation-service/logs](http://20.207.122.201/evaluation-service/logs)"; // not sure if this will change later, might move to env

// yeah the naming here is a bit inconsistent… might refactor later
export async function sendLogData(stackName, logLevel, pkgName, msg, authToken) {
// quick guard — no token means we just skip logging (maybe not the best idea but fine for now)
if (!authToken) {
console.warn("No auth token provided, skipping log...");
return null;
}

// building payload separately just to keep things readable (even if slightly redundant)
const payload = {
stack: stackName,
level: logLevel,
package: pkgName, // "package" feels like a weird key but sticking to API spec
message: msg,
};

try {
const res = await fetch(LOG_API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${authToken}`, // hope token is still valid here
},
body: JSON.stringify(payload),
});

```
// not handling non-200 properly yet — will revisit if needed
const data = await res.json();

return data;
```

} catch (err) {
// fallback logging — probably should integrate with something better later
console.log("Something went wrong while calling Log API:", err);

```
// was thinking of throwing this again, but might be too noisy for now
// throw err;
```

}
}
