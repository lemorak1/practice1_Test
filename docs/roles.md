# Role Persistence

The current user role is kept inside the `AppProvider` context. To avoid losing it on page reloads, the value is saved in `localStorage` under `user-role`.
When the provider mounts it reads that value (if present) and updates the context.
Any change to the role writes it back to `localStorage` so the header switch remains consistent across refreshes.
