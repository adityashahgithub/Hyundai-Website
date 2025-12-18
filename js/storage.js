(function(window) {
    const PREFIX = 'hyundai:';
    const memoryStore = {};

    function isLocalStorageAvailable() {
        try {
            const k = '__ls_test__';
            window.localStorage.setItem(k, '1');
            window.localStorage.removeItem(k);
            return true;
        } catch (e) {
            return false;
        }
    }

    const hasLS = isLocalStorageAvailable();

    function now() { return Date.now(); }

    function set(key, value, options = {}) {
        const payload = { v: value, t: options.ttl ? now() + options.ttl : null };
        const raw = JSON.stringify(payload);
        const k = PREFIX + key;
        if (hasLS) {
            try { window.localStorage.setItem(k, raw); } catch (e) {}
        } else {
            memoryStore[k] = raw;
        }
    }

    function get(key, defaultValue = null) {
        const k = PREFIX + key;
        const raw = hasLS ? window.localStorage.getItem(k) : memoryStore[k];
        if (!raw) return defaultValue;
        try {
            const payload = JSON.parse(raw);
            if (payload.t && payload.t < now()) {
                remove(key);
                return defaultValue;
            }
            return payload.v;
        } catch (e) {
            return defaultValue;
        }
    }

    function remove(key) {
        const k = PREFIX + key;
        if (hasLS) {
            try { window.localStorage.removeItem(k); } catch (e) {}
        } else {
            delete memoryStore[k];
        }
    }

    function clearAll() {
        if (hasLS) {
            try {
                Object.keys(window.localStorage)
                    .filter(k => k.startsWith(PREFIX))
                    .forEach(k => window.localStorage.removeItem(k));
            } catch (e) {}
        } else {
            Object.keys(memoryStore)
                .filter(k => k.startsWith(PREFIX))
                .forEach(k => delete memoryStore[k]);
        }
    }

    function saveForm(formId, key) {
        const form = document.getElementById(formId);
        if (!form) return;
        const data = {};
        Array.from(form.elements).forEach(el => {
            if (!el.name) return;
            if (el.type === 'checkbox' || el.type === 'radio') {
                data[el.name] = el.checked;
            } else {
                data[el.name] = el.value;
            }
        });
        set(key, data);
    }

    function loadForm(formId, key) {
        const form = document.getElementById(formId);
        if (!form) return;
        const data = get(key);
        if (!data) return;
        Array.from(form.elements).forEach(el => {
            if (!el.name) return;
            const val = data[el.name];
            if (val === undefined) return;
            if (el.type === 'checkbox' || el.type === 'radio') {
                el.checked = !!val;
            } else {
                el.value = val;
            }
        });
    }

    window.StorageUtil = { set, get, remove, clearAll, saveForm, loadForm, hasLS };
})(window);
